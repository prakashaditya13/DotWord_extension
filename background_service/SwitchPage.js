
//Creating a new tab for redirecting an URL from SwitchPopup.html Page action
document.addEventListener('DOMContentLoaded', function () {
    for (const anchor of document.getElementsByClassName('dotversion')) {
      anchor.onclick = () => {
        chrome.tabs.create({active: true, url: anchor.href});
      };
    };
});
 //checkbox checking
   var checkbox = document.querySelector('input[type="checkbox"]');
   chrome.storage.sync.get(['isChecked'], function(result){
     if(result.isChecked === 'true'){
         console.log(result.isChecked)
         checkbox.checked = true
     }else{
         console.log(result.isChecked)
         checkbox.checked = false
     }
   })
   // toggle value of switch
   checkbox.addEventListener('change', function () {
     if (checkbox.checked) {
      chrome.storage.sync.set({'isChecked': "true"}, function(){})
      chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
     } else {
         chrome.storage.sync.set({'isChecked': "false"}, function(){})
         chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
        });
     }
   });