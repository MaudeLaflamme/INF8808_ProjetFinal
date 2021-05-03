
export const colorScheme = ["#8BD98E", "#639FEF", "#E0E0E0", "#AB80DA", "#E98282", "#ECE86B", "#EB992D", "#EC9AF5", "#9af5e0", "#595cf7"]

export const svgSize = {
    width: 960,
    height: 625
  }

export const margin = {top: 20, right:160, bottom:35, left:35}
export const width = 960 - margin.left - margin.right
export const stackedHeight = 500
export const text = [
  {select: "#introduction", text: "<h1>FACEBOOK</h1><p class='text-class'>Avec 2,74 milliards d’utilisateurs actifs mensuellement, Facebook \
                                    est la plateforme de réseau social la plus utilisée dans le monde et sa popularité est bien établie depuis \
                                     maintenant une dizaine d’années. Il va sans dire que c’est donc une plateforme de choix pour partager du \
                                     contenu afin de rejoindre une très grande audience rapidement; ainsi, pratiquement tous les médias d’information \
                                    ont une page Facebook sur laquelle ils partagent leurs articles écrits, capsules vidéo et même des conférences en \
                                    direct sur lesquels les utilisateurs peuvent réagir, commenter ou partager à leur propre réseau à leur tour. Pour une \
                                     majorité d’adultes américains, les réseaux sociaux sont même devenus une source fréquente de nouvelles quotidiennes. \
                                     Les médias d’information ne sont toutefois pas les seuls à avoir des pages Facebook qui partagent du contenu : n’importe \
                                     quel regroupement ou individu peut partager du matériel sur cette plateforme. On se retrouve donc avec beaucoup de \
                                     contenu relayé par des pages médiatiques ou non, et des individus qui se servent de ce contenu comme source d’informations.\
                                    On s’intéresse à dresser un bilan des pages ayant partagé du contenu en explorant l’importance relative des pages médiatiques\
                                     par rapport aux pages diffusant tout autre type de contenu. Ce bilan aurait pour public cible les utilisateurs canadiens de\
                                    Facebook (25 millions de personnes), ce qui est comparable au public d’un grand média.</p>"},
  {select: "#section1", text: "<h2>Exploration du comportement des utilisateurs</h2><p class='text-class'>Cette sous-section explore les comportements des \
                                    utilisateurs en fonction du type de contenu proposé.\</p>"},
  {select: "#viz1-text", text: "<h3>Réactions et interactions des utilisateurs selon le type de publication</h1><p class='text-class'>La visualisation suivante \
                                    permet de voir comment sont distribués les différents types d'interactions (commentaires, partages ou réactions) ainsi que \
                                    les différentes réactions selon le type de publication. On observe que la <i>Vidéo</i> est le type de publication qui suscite \
                                    le plus d’interactions de la part des utilisateurs. Les réactions constituent un peu plus du tiers des interactions recensées. \
                                    De plus, quel qu’il soit le type de publication la réaction <i>J’aime</i> est la plus utilisée, tandis que la réaction <i>Solidaire</i> n'est que très rarement utilisée.</p>"},
  {select: "#section2", text: "<h2>Comparaison entre page médiatiques et non-médiatiques</h2><p class='text-class'>Dans cette sous-section, \
                              nous allons explorer les différences entre les pages de médias officiels et les pages non-médiatiques. Ces différences \
                              incluent les différences du comportement des usagers ainsi que du contenu proposé par ces deux types de pages.<p>"},
  {select: "#viz2-text", text: "<h3>Nombre moyen d'interactions par type de publications</h1><p class='text-class'>La visualisation ci-dessous permet \
                              de comparer le nombre moyen d'interraction par type de publications (images, vidéos, statuts ou liens) selon les deux \
                              types de pages.</br>On remarque que les pages non-médiatiques reçoivent beaucoup plus d'interactions \
                              que les pages de médias officiels, et ce, pour tous types de publications confondus. On peut également voir que le type de \
                              publication <i>Vidéo</i> est celui qui provoque le plus d'interactions, surtout pour les pages non-médiatiques pour lesquelles \
                              il en entraîne plus du double de celles médiatiques. Une autre observation notable est que la seule catégorie de publication \
                              pour laquelle les pages médiatiques se rapprochent des pages non-médiatiques en termes d'interactions est celle des liens vers \
                              des ressources externes à Facebook.</p>"},
  {select: "#viz3-text", text: "<h3>Comparaison des proportions de différentes données concernant les publications faites par des pages Facebook</h1>\
                                <p class='text-class'>La visualisation suivante permet de comparer différentes proportions \
                                par rapport aux publications de pages médiatiques et de pages non-médiatiques. Le premier graphique présente \
                                les proportions des interactions des utilisateurs faites sur l'ensemble des publications de chaque type de pages.\
                                Le deuxième graphique présente les proportions des différentes réactions données à toutes les publications \
                                de chaque type de pages. Finalement, le troisième graphique présente les proportions des différentes langues dans lesquelles \
                                les publications ont été faites, encore une fois, pour les pages médiatiques et les pages non-médiatiques.<br/> \
                                On remarque que les proportions sont similaires au niveau des intéractions faites sur les publications des pages \
                                médiatiques par rapport aux pages non-médiatiques, bien que les publications faites par les pages non-médiatiques \
                                génèrent beaucoup plus d'intéractions au total. Pour ce qui est des réactions données aux publications, on observe \
                                que les pages médiatiques ont une plus grande variété de réactions faites sur leurs publications, alors que les pages \
                                non-médiatiques, elles, ont principalement des 'J'aime', 'J'adore' et des 'Haha'. Finalement, on peut voir que bien \
                                que l'anglais et le français soient les deux langues principales dans lesquelles les publications sont faites pour les \
                                deux types de pages, les pages non-médiatiques ont tout de même une plus grande variété de langues, alors que les pages \
                                médiatiques n'ont pas de publications faites dans d'autres langues du tout. </p>"},
  {select: "#conclusion", text: "<h2>Données et méthodologie</h2><p class='text-class'>Le jeu de données est constitué de données relatives aux différentes \
                                 publications effectuées par une sélection de pages Facebook entre 2018 et 2020 recueillies par l'outil CrowdTangle. Les types de publications de la première et \
                                 de la deuxième visualisation ont été regroupées en quatre types: <i>Images, Vidéos, Status et Liens</i>. Dans la catégorie <i>Images</i> \
                                 on retrouve les publications de type <i>album</i> et <i>photo</i>, dans la catégorie <i>Vidéos</i> on retrouve les publications \
                                 de type <i>video, live_video, live_video_complete, live_video_scheduled, native_video, extra_clip</i> et <i>episode</i>. \
                                 La catégorie <i>Liens</i> contient les publications de types <i>link</i> et <i>youtube</i> et finalement, la catégorie \
                                 <i>Status</i> contient les publications de type <i>status</i> seulement. </p>"}
]
