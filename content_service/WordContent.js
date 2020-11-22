chrome.storage.sync.get(['isChecked'], function(result){
    if(result.isChecked === 'true'){
        (() => {
            document.querySelectorAll('a').forEach(a => a.removeAttribute('href'));
        })()
        document.addEventListener('mouseup', function(event)
            {
                if (document.contains(document.getElementById("word-Success"))) {
                    document.getElementById("word-Success").remove();
                }
                if (document.contains(document.getElementById("word-error"))) {
                    document.getElementById("word-error").remove();
                }
                var sel = window.getSelection().toString(); 
                if(/^[a-zA-Z]+$/.test(sel) && sel.length>0){
                    var result;
                    //https://api.dictionaryapi.dev/api/v2/entries/en/{Word}
                    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${sel}`)
                    .then(res => res.json())
                    .then(data => {
                        result = data[0]
                        DataSet(result);
                    })   
                }else{
                    var errorDiv = document.createElement('div');
                    errorDiv.setAttribute('id', 'word-error');
                    errorDiv.textContent = "Word selection Error (Please select right word without comma, spaces or special symbols)."
                    document.body.appendChild(errorDiv)
                    //Perform a Error API calls
                    // if (document.contains(document.getElementById("word-Success"))) {
                    //     document.getElementById("word-Success").remove();
                    // }
                }    
            },false)
        }else if(result.isChecked === 'false'){
            document.addEventListener('mouseup', function(event){
                if (document.contains(document.getElementById("word-Success"))) {
                    document.getElementById("word-Success").remove();
                }
                var div = document.createElement('div')
                div.setAttribute('id', "word-Success")
                div.style.border = "2px solid blue"
                div.style.position = "fixed";
                div.textContent = "Please enable the Dot word extension."
                document.body.appendChild(div)
            })
        }
})
function DataSet(result){
    var resObj = {
        word: result.word,
        text: result.phonetics[0].text,
        meanings: result.meanings[0].definitions[0].definition,
        example: result.meanings[0].definitions[0].example,
        synonyms: result.meanings[0].definitions[0].synonyms
    }

    HTMLtemplate = `<div id="word-content">
    <div class="border-clr"></div>
    <h2 id="word">${resObj.word}<sup style="color:#767272;font-size:10px;">Word</sup>
        : <span id="word-txt">${resObj.text} </span>
    </h2>
    <h6 id="def"><i>Definitions</i></h6>
    <p id="def-content">${resObj.meanings}</p>
</div>`
    var div = document.createElement('div')
    div.setAttribute('id', "word-Success")
    div.innerHTML = HTMLtemplate
    document.body.appendChild(div)
}

{/* <h6 id="exam"><i>Example</i></h6>
    <p id="exam-content">${resObj.example}</p>
    <h6 id="syno"><i>Synonyms</i></h6>
    <p id="syno-content">${resObj.synonyms.map(a => a)}</p> */}