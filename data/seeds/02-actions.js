exports.seed = function(knex) {
    return knex('actions').insert([
      {description: 'NPM Init/ create-react-app', notes:'use NPM Init if your brave', project_id: 1},
      {description: 'Make those components!', project_id: 1},
      {description: 'Delete bootstrap from the internet', project_id: 2},
      {description: 'Make your own styles', project_id: 2},
    ]);
  };