exports.seed = function(knex) {
    return knex('projects').insert([
      {name: 'Create React App', description: 'make a beautiful React app'},
      {name: 'Epic CSS', description: 'every developer hates and loves CSS at the same time'},
    ]);
  };