function updateFetchedData(data) {
  return data.articles.map(article => {
    return {
      source: article.name || article.id,
      
    }
  });
}
