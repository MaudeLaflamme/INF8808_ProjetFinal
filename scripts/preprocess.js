

export function count(data, column) {
  return data.reduce((counts, row) => {
    if(row[column] in counts) {
      counts[row[column]] += 1
    }
    else {
      counts[row[column]] = 1
    }
    return counts
  }, {})
}

export function formatLanguage(code) {
  var codeToName = new Intl.DisplayNames(['fr'], {type: 'language'})
  var language = codeToName.of(code)
  return language.charAt(0).toUpperCase() + language.slice(1)
}

export function formatDate(data) {
  data.forEach(line => line['date'] = new Date(line['date']).getUTCFullYear())
}

export function getTop(data, category, topFirst) {
    const countedCategory = count(data, category)
    const top = Object.keys(countedCategory).sort((nameA, nameB) => countedCategory[nameB]-countedCategory[nameA]).slice(0,topFirst)

    var topCounts = {"Autres": 0}
    Object.keys(countedCategory).forEach(key => {
      if(!top.includes(key)) {
        topCounts["Autres"] += 1
      }
      else {
        topCounts[key] = countedCategory[key]
      }
    })
    return topCounts
  }

export function sum(data, column) {
  return data.reduce((sum, row) => {
    return sum + row[column]
  }, 0)
}

export function filterByColumn(data, filters) {
  /**
   * {
   * 'media': 'oui'
   * 'typePost': 'photo'
   * }
   */
  return data.filter(line => {
    var bool = true
    Object.keys(filters).forEach(key => {
      bool = bool && (line[key] == filters[key])
    })
    return bool
  })
}


export function groupByYear (data) {
  
}
