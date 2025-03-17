
        let headerbtn=document.querySelector(".header span");
        let addpage=document.querySelector(".addpage")
        let input=document.querySelector(".addpage input")
        let addbtn=document.querySelector(".addpage #add-btn")
        let cansel=document.querySelector(".addpage #cansel")
        let updatepage=document.querySelector(".updatepage")
        let updateinput=document.querySelector(".updatepage input")
        let updatebtn=document.querySelector(".updatepage #update-btn")
        let updatecansel=document.querySelector(".updatepage #cansel")
        let content=document.querySelector(".content")
        let now= new Date()
        let date= `${now.getDate()} / ${now.getMonth()+1} / ${now.getFullYear()}`
        let tasks=[];
        // get the array value from local storage
        if(JSON.parse(localStorage.getItem("tasks"))===null){
            tasks=[]
        }
        else{
            tasks=JSON.parse(localStorage.getItem("tasks"));
        }
        // function to show all tasks
        function readcontent(){            
            content.innerHTML="";
            for(let i=0;i<tasks.length;i++)
            {
                let backgreen=tasks[i].isdone===true?"background-green":"";
                let colgreen=tasks[i].isdone===true?"color-green":"";
                    content.innerHTML+=
                    `
                        <div class="task ${backgreen}">
                            <div class="info">
                                <h3>${tasks[i].title}</h3>
                                <span>${tasks[i].date}  <i class="fa-solid fa-calendar-days" style="margin-right: 5px;"></i></span>
                            </div>
                            <div class="curd">
                                <span onclick="deletefun(${i})" class="delete"><i class="fa-solid fa-trash"></i></span>
                                <span onclick="isdonefun(${i})" class="check ${colgreen}"><i class="fa-solid fa-check"></i></span>
                                <span onclick="updatefun(${i})" class="update"><i class="fa-solid fa-pen"></i></span>
                            </div>
                        </div>
                    `
                    
            }
        }
        // call the function
        readcontent();

        // onclick in the add task button
        headerbtn.onclick=function(){
            addpage.classList.remove("d-n");
        }

        // onclick in the cansel button in the addpage
        cansel.onclick=function(){
            addpage.classList.add("d-n");
        }

        // onclick in the add button in the addpage
        addbtn.onclick=function(){
            let newobj=
                {
                    "title":input.value,
                    "date":date,
                    "isdone":false,
                }
            tasks.push(newobj);
            // set the local storage = array
            localStorage.setItem("tasks",JSON.stringify(tasks))
            readcontent();
            input.value="";
            addpage.classList.add("d-n");
        }
        // onclick in the check button
        function isdonefun(index){
            tasks[index].isdone===true?tasks[index].isdone=false:tasks[index].isdone=true;
            // set the local storage = array
            localStorage.setItem("tasks",JSON.stringify(tasks))
            readcontent();
        }
        // onclick in the delete button
        function deletefun(index){
            tasks.splice(index,1);
            // set the local storage = array
            localStorage.setItem("tasks",JSON.stringify(tasks))
            readcontent();
        }
        // onclick in the update button
        function updatefun(index){
            updatepage.classList.remove("d-n");
            // onclick in the cansel btn in update page
            updatecansel.onclick=function(){
                updatepage.classList.add("d-n");
            }
            // onclick in the update btn in update page
            updatebtn.onclick=function(){
                tasks[index].title=updateinput.value
                // set the local storage = array
                localStorage.setItem("tasks",JSON.stringify(tasks))
                readcontent();
                updateinput.value="";
                updatepage.classList.add("d-n");
            }
        }