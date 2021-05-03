import pandas as pd
import numpy as np
import json
from pathlib import Path

videos = ['video', 'live_video', 'live_video_complete', 'live_video_scheduled', 'native_video', 'extra_clip', 'episode']
links = ['link', 'youtube']
photos = ['album', 'photo']
status = ['status']

reactions = ['likes', 'love', 'haha', 'wow', 'triste', 'colere', 'solid']
interactions = ['commentaires', 'partages', 'reactions']

bin_to_page_type = {
    "oui": "Page médiatique",
    "non": "Page non-médiatique"
}

interactions_to_french = {
    'commentaires': 'Commentaires',
    'partages': 'Partages',
    'reactions': 'Réactions'
}

reactions_to_french = {
    "likes": "J'aime",
    "love": "J'adore",
    "haha": "Haha",
    "wow": "Wouah",
    "triste": "Triste",
    "colere": "Grrr",
    "solid": "Solidaire"
}

project_dir = Path(__file__).parents[1]
data_dir = project_dir / 'assets' / 'data'


def add_reaction_count(df: pd.DataFrame):
    df['reactions'] = np.sum(df[reactions].values, axis=1)


def get_counts(df: pd.DataFrame, category):
    counts = df[category].value_counts()
    return counts.to_dict()


def get_most_frequent(df: pd.DataFrame, category, top_first=3):
    counts = df[category].value_counts()
    return counts.index.values[:top_first]


def format_date(df: pd.DataFrame):
    df['date'] = pd.to_datetime(df['date'], infer_datetime_format=True, utc=True).dt.year


def format_post_types(df: pd.DataFrame):
    new_types = ['Vidéo', 'Photo', 'Lien', 'Status']
    for old, new in zip([videos, photos, links, status], new_types):
        df['typePost'].replace(to_replace=old, value=new, inplace=True)


def get_count_for_top(df, category, to_keep):
    counts = get_counts(df, category)
    other_count = 0
    to_pop = []
    for key in counts.keys():
        if key not in to_keep:
            other_count += counts[key]
            to_pop.append(key)
    for key in to_pop:
        counts.pop(key)
    counts['others'] = other_count
    return counts


def data_for_clustered_bc(df: pd.DataFrame, output_file=(data_dir/'clustered_barchart.csv')):
    df_by_page = df[['media', 'typePost', 'interactions']]\
        .groupby(["media", 'typePost'])\
        .sum()\
        .unstack(level=0)

    df_by_page.columns = df_by_page.columns.get_level_values(1)

    for page_type in np.unique(df['media']):
        post_counts = get_counts(df[df['media'] == page_type], 'typePost')
        for post_type in post_counts.keys():
            df_by_page.at[post_type, page_type] = df_by_page.at[post_type, page_type]/post_counts[post_type]

    df_by_page.rename(columns=lambda x: bin_to_page_type[x], inplace=True)
    df_by_page.reset_index(inplace=True)
    df_by_page.to_csv(output_file, index=False)


def get_sum_by_media(df, cols, format_dict):
    results = {}
    post_counts = get_counts(df, 'media')

    counts = df[['media'] + cols].groupby('media').sum()
    counts['post_counts'] = counts.index.map(post_counts)
    counts['total'] = counts[cols].sum(axis=1)
    relative_counts = counts[cols].div(counts.total, axis=0)
    relative_counts.rename(columns=lambda x: format_dict[x], inplace=True)
    mean_counts = counts[cols].div(counts.post_counts, axis=0).astype(int)
    mean_counts.rename(columns=lambda x: format_dict[x], inplace=True)
    for page_type in relative_counts.index.values:
        results[bin_to_page_type[page_type]] = {
            "mean": mean_counts.loc[page_type].to_dict(),
            "relative": relative_counts.loc[page_type].to_dict()
        }
    return results


def data_for_stacked_barchart(df: pd.DataFrame, output_file=(data_dir/'stacked_barchart.json')):
    data = {
        'Intéractions': get_sum_by_media(df, interactions, interactions_to_french),
        'Réactions': get_sum_by_media(df, reactions, reactions_to_french),
        'Langues': {}
    }

    freq_langue = get_most_frequent(df, 'langue', 3)
    df_by_page_type = df.groupby("media")
    for page_type in df_by_page_type.groups:
        page_data = df_by_page_type.get_group(page_type)
        langue_count = get_count_for_top(page_data, 'langue', freq_langue)
        total = sum([v for v in langue_count.values()])
        langue_count = {k: v / total for k, v in langue_count.items()}
        data['Langues'][bin_to_page_type[page_type]] = {
            'relative': langue_count
        }

    with open(output_file, 'w') as fp:
        json.dump(data, fp, indent=4)


def data_for_sankey(df: pd.DataFrame, output_file=(data_dir/"data_sankey.csv")):
    group_by_interactions = df[['typePost'] + interactions + reactions] \
        .groupby('typePost') \
        .sum()

    group_by_interactions.reset_index(inplace=True)
    final_df = pd.DataFrame(columns=['source', 'target', 'value', 'diagram', 'sub'])
    post_counts = get_counts(df, 'typePost')
    for i in group_by_interactions.index:
        post_type = group_by_interactions['typePost'][i]
        group_by_interactions.loc[i, interactions+reactions] = group_by_interactions.loc[i, interactions+reactions]\
            .apply(lambda x: x/post_counts[post_type]).astype(int)
        for col in interactions:
            col_formatted = interactions_to_french[col]
            final_df = final_df.append({'source': post_type,
                                        'target': col_formatted,
                                        'value': group_by_interactions.loc[i, col],
                                        'diagram': 'Principal',
                                        'sub': False}, ignore_index=True)
        for col in reactions:
            col_formatted = reactions_to_french[col]
            final_df = final_df.append({'source': 'Réactions',
                                        'target': col_formatted,
                                        'value': group_by_interactions.loc[i, col],
                                        'diagram': group_by_interactions.loc[i, 'typePost'],
                                        'sub': True}, ignore_index=True)

    total_reactions = group_by_interactions[reactions].sum()

    for col in reactions:
        col_formatted = reactions_to_french[col]
        final_df = final_df.append({'source': 'Réactions',
                                    'target': col_formatted,
                                    'value': total_reactions[col],
                                    'diagram': 'Principal',
                                    'sub': True}, ignore_index=True)

    final_df.to_csv(output_file, index=False)


if __name__ == '__main__':
    df = pd.read_csv('poly-Facebook-2018-2020.csv')
    format_date(df)
    format_post_types(df)
    add_reaction_count(df)
    data_for_clustered_bc(df)
    data_for_stacked_barchart(df)
    data_for_sankey(df)
