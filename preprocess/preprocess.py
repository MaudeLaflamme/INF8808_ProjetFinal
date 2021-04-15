import pandas as pd
import numpy as np
import json
from pathlib import Path

reactions = ['likes', 'love', 'haha', 'wow', 'triste', 'colere', 'solid']
interactions = ['commentaires', 'partages', 'reactions']

bin_to_page_type = {
    "oui": "media",
    "non": "non-media"
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


def data_for_clustered_bc(df: pd.DataFrame, output_file=(data_dir/'clustered_barchart.json')):
    data = {}
    post_types = get_most_frequent(df, 'typePost', 4)
    df_by_page_type = df.groupby("media")
    for page_type in df_by_page_type.groups:
        page_data = df_by_page_type.get_group(page_type)
        post_counts = get_count_for_top(page_data, 'typePost', post_types)

        interaction_counts = page_data[['typePost', 'interactions']].groupby('typePost').sum()
        other_indices = [i for i in interaction_counts.index.values if i not in post_types]
        other_counts = interaction_counts.loc[other_indices].sum().rename('others')
        interaction_counts = interaction_counts.append(other_counts)
        interaction_counts.drop(index=other_indices, inplace=True)
        interaction_counts = interaction_counts['interactions'].to_dict()

        for post in interaction_counts.keys():
            interaction_counts[post] /= post_counts[post]
            interaction_counts[post] = round(interaction_counts[post])
        data[bin_to_page_type[page_type]] = interaction_counts

    with open(output_file, 'w') as fp:
        json.dump(data, fp, indent=4)


def get_sum_by_media(df, cols):
    results = {}
    post_counts = get_counts(df, 'media')

    counts = df[['media'] + cols].groupby('media').sum()
    counts['post_counts'] = counts.index.map(post_counts)
    counts['total'] = counts[cols].sum(axis=1)
    relative_counts = counts[cols].div(counts.total, axis=0)
    mean_counts = counts[cols].div(counts.post_counts, axis=0).astype(int)
    for page_type in relative_counts.index.values:
        results[bin_to_page_type[page_type]] = {
            "mean": mean_counts.loc[page_type].to_dict(),
            "relative": relative_counts.loc[page_type].to_dict()
        }
    return results


def data_for_stacked_barchart(df: pd.DataFrame, output_file=(data_dir/'stacked_barchart.json')):
    data = {
        'interactions': get_sum_by_media(df, interactions),
        'reactions': get_sum_by_media(df, reactions),
        'langues': {}
    }

    freq_langue = get_most_frequent(df, 'langue', 3)
    df_by_page_type = df.groupby("media")
    for page_type in df_by_page_type.groups:
        page_data = df_by_page_type.get_group(page_type)
        langue_count = get_count_for_top(page_data, 'langue', freq_langue)
        total = sum([v for v in langue_count.values()])
        langue_count = {k: v / total for k, v in langue_count.items()}
        data['langues'][bin_to_page_type[page_type]] = {
            'relative': langue_count
        }

    with open(output_file, 'w') as fp:
        json.dump(data, fp, indent=4)


if __name__ == '__main__':
    df = pd.read_csv('poly-Facebook-2018-2020.csv')
    format_date(df)
    add_reaction_count(df)
    data_for_clustered_bc(df)
    data_for_stacked_barchart(df)
