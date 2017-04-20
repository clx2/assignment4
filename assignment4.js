(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');

  var input = $(".flexsearch-input").after("<ul class='flexsearch-results'></ul>");
  var allResults = $(".flexsearch-results");
  var data = [];

  $.when(
    $.getJSON( 'http://www.mattbowytz.com/simple_api.json?data=comics', function(response)
    {
      $.each(response, function(key, val)
      {
        if(val !== 12 && val !== 200 && val.length > 2)
        {
          data =  data.concat(val);
        }
      });
    }),
    $.getJSON( 'http://www.mattbowytz.com/simple_api.json?data=interests', function(response)
    {
      $.each( response, function(key, val)
      {
        if(val !== 9 && val !== 200 && val.length > 2)
        {
          data =  data.concat(val);
        }
      });
    })
  ).then(function()
  {
    for(var i = 0; i < data.length; i++)
    {
      data.sort();
      allResults.append("<ul class='circle'> <li>" + data[i] + "</li></ul>");
    }

    input.on("keyup", function(event)
    {
      var search = input.val().toLowerCase();
      var results = [];

      for(var i = 0; i < data.length; i++)
      {
        var string = data[i].toLowerCase();
        if(string.includes(search))
        {
          results.push(data[i]);
        }
      }

      allResults.html("");

      if(results.length)
      {
        for(i = 0; i < results.length; i++)
        {
          allResults.append("<ul class='circle'> <li>" + results[i] + "</li></ul>");
        }
      }
    });
  });
})();
