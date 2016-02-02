//<iframe id="frmFile" src="/sourcelist.txt" onload="WordList.loadFile();" style="display: none;"></iframe>

/* var xmlHttp = new XMLHttpRequest();
xmlHttp.open("POST", "D:/Study-Assignment/D.Patterns-Excercise/sourcelist.txt", false);
//xmlHttp.overrideMimeType('text/xml; charset=iso-8859-1');
xmlHttp.send();
var result= xmlHttp.responseText;
var sourcelist=[];
sourcelist=result.split('\n');
*/
   // var sourceList;
    var WordList = {

        sourcelist:["word","list","country","document","ball","success","surprise","failure","cat","rat","intelligence","colour","temporary","life","power","blossom"],

    resultsetlist: [],
        //sourcelist:[],
        listeners: {},
        search: function() {

            var input = event.target.value;

            if(input==null||input.trim()=='')
            {
                this.resultsetlist = [];
                this.resultsetlist=this.sourcelist;
                this.dispatch("user-searched");


            }
            else
            {
                this.resultsetlist = [];
                for (var j=0; j<this.sourcelist.length; j++) {
                    if(this.sourcelist[j].indexOf(input) > -1)
                    {
                        // alert('hi');
                        this.resultsetlist.push(this.sourcelist[j]);
                    }
                }



                this.dispatch("user-searched");

            };

        },
        on: function(eventName, listener) {
            if(!this.listeners[eventName])
                this.listeners[eventName] = [];
            //this.listeners[eventName].clear();
            this.listeners[eventName].push(listener);
        },
        dispatch: function(eventName) {
            if(this.listeners[eventName]) {
                for(var i=0; i<this.listeners[eventName].length; i++) {
                    this.listeners[eventName][i](this);
                }
            }
        },
        numOfsearchedWordList: function() {
            return this.resultsetlist;
        },
        loadFile:function() {
            var oFrame = document.getElementById("frmFile");
            var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
            while (strRawContents.indexOf("\r") >= 0)
                strRawContents = strRawContents.replace("\r", "");
            arrLines = strRawContents.split("\n");
            for (var i = 0; i < arrLines.length; i++) {
                this.sourcelist = arrLines[i];
            }
        }
    }

    WordList.on("user-searched", function() {
        var res = WordList.numOfsearchedWordList();
        document.getElementById("result").innerHTML ="";
        for (var i = 0; i < res.length; i++) {
            document.getElementById("result").innerHTML += res[i] + "<br>";
        }

    });
