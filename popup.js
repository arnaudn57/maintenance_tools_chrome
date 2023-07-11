document.addEventListener('DOMContentLoaded', function() {
  var copyButton = document.getElementById('copyButton');
  copyButton.addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: "var pluginTitles = document.getElementsByClassName('plugin-title'); Array.from(pluginTitles).map(title => title.innerText);"
    }, function(result) {
      var pluginNames = result[0];
      var pluginNamesString = "";
      pluginNames.forEach(function(pluginName) {
        var match = pluginName.match(/([\w\s]+)\n/);
        if (match && match[1]) {
          pluginNamesString += "extension " + match[1] + " ||" + "\n";
        }
      });
      navigator.clipboard.writeText(pluginNamesString)
        .then(function() {
          alert('Noms des plugins copiés !');
        })
        .catch(function() {
          alert('Erreur lors de la copie des noms des plugins.');
        });
    });
  });
});
