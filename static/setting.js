
function set_dark_theme(){
    document.body.style.backgroundImage = "linear-gradient(#081f37,#0d2f53,#081f37)";

}

function set_bright_theme(){
    document.body.style.backgroundImage = "linear-gradient(#113f70,#ffffff,#113f70)";
}

function set_font_size(size){
    document.body.style.fontSize = `${size}px`
}




function ChangeUserName(){
    const old_username = document.getElementById("Current-username").value;
    const new_username = document.getElementById("New-username").value;

    if (old_username == "" || new_username == ""|| old_username == " " || new_username == " "  ){
        alert("Invalid Username ")
    }
    else if (old_username == new_username){
        alert("Same Username!")
    } else if(old_username == sessionStorage.getItem("Username")){
        $.post("/access_account_detail",{Username:old_username},function(data){
            const id = data.ID
            $.post("/update_account_username",{id:id,New_username:new_username})
            sessionStorage.setItem("Username",new_username)
            alert("UserName Changed")
        })
    }
}


function ChangePassword(){
    const old_Password = document.getElementById("Current-password").value;
    const new_Password = document.getElementById("New-password").value;

    if (old_Password == new_Password){
        alert("Same Password!")
    } else if(old_Password == sessionStorage.getItem("Password")){
        $.post('/password_strength',{Password:new_Password},function(data){
            if (data.score < 20){
                alert("Password is not Strong enough")
            }else {
                $.post("/access_account_detail",{Username:sessionStorage.getItem("Username")},function(data){
                    $.post("/password_Update",{id:data.ID,New_password:new_Password})
                    sessionStorage.setItem("Password",new_Password)
                    alert("Password Changed")
                })
        
            }
        })
            } else{
        alert("Invalid Password change")
    }
}


function save_setting(){
    $.post('/access_account_detail',{Username:sessionStorage.getItem("Username")},function(data){
        const ID = data.ID

    
        if (document.body.style.backgroundImage == "linear-gradient(rgb(17, 63, 112), rgb(255, 255, 255), rgb(17, 63, 112))"){
            const Theme = "bright"
            const FontSize = document.body.style.fontSize;
            $.post('/update_user_setting',{id:ID,theme:Theme,fontSize:FontSize});
        }else {            
            const Theme = "dark"
            const FontSize = document.body.style.fontSize;
            $.post('/update_user_setting',{id:ID,theme:Theme,fontSize:FontSize});
        } 
        
        
    })
}


function access_setting(){
    check_invalid_enter()
    $.post('/access_account_detail',{Username:sessionStorage.getItem("Username")},function(data){
        const ID = data.ID
        $.post('/access_user_setting',{id:ID},function(data){
            if(data.Theme != null){
                const Theme = data.Theme
                const FontSize = data.Fontsize
                if (Theme == "bright"){
                    set_bright_theme()
                    document.getElementById('bright-theme').checked = true;
                } else{
                    document.getElementById('dark-theme').checked = true;
                }
                document.body.style.fontSize = FontSize
                
                document.getElementById("font-size").value = Number(FontSize.substring(2,-2))
                
                
            }
        })
    })
}
