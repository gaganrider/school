// let main = document.querySelector(".strength");
// let out = document.querySelector(".strengthout");
// let inside = document.querySelector(".strengthin");
// let text = document.querySelector(".strengthtext");
// let pass = document.querySelector("#password");
// let newpass = document.querySelector("#newpass");

// // text.innerText="helllo"
// // inside.style.color="blue";


// newpass.addEventListener("focus",()=>{
//     main.style.display="initial";
// })

// newpass.addEventListener("blur",()=>{
//     main.style.display="none";
// })


// // const strength=()=>{

// // if(password.value.length<6){
// //     text.innerText="too short";
// //     text.style.color="red"
// //     inside.style.width="10%"
// // }
// // else{

// // let lowercase = password.value.match(/[a-z]/);
// // let uppercase = password.value.match(/[A-Z]/);
// // let number = password.value.match(/[0-9]/);
// // let chac = password.value.match(/[\!\@\#\$\%\^\&\*\(\)\_\-\=\+]/);




// // if(lowercase && uppercase && number && chac){
// //     text.innerText="Strong";
// //     text.style.color="Green"
// //     inside.style.width="100%"
// //     inside.style.color="Green"
// // }else if(
// //     (lowercase && uppercase)||  (lowercase && number )||( chac&& lowercase) || 
// //        ( chac&& number)||( chac&& uppercase)||( uppercase && number) ){
// //             text.innerText="Medium";
// //             text.style.color="Yellow"
// //             inside.style.width="60%"
// //             inside.style.color="Yellow"

// // }else
// // //  if(lowercase||uppercase||number||chac)
// //  {
// //     text.innerText="Weak";
// //     text.style.color="red"
// //     inside.style.width="30%"
// // }
    
// // }

// // }

// newpass.addEventListener("keyup",()=>{

//     if(password.value.length<6){
//         text.innerText="too short";
//         text.style.color="red"
//         inside.style.width="10%"
//     }
//     else{
    
//     let lowercase = password.value.match(/[a-z]/);
//     let uppercase = password.value.match(/[A-Z]/);
//     let number = password.value.match(/[0-9]/);
//     let chac = password.value.match(/[\!\@\#\$\%\^\&\*\(\)\_\-\=\+]/);
    
    
    
    
//     if(lowercase && uppercase && number && chac){
//         text.innerText="Strong";
//         text.style.color="Green"
//         inside.style.width="100%"
//         inside.style.color="Green"
//     }else if(
//         (lowercase && uppercase)||  (lowercase && number )||( chac&& lowercase) || 
//            ( chac&& number)||( chac&& uppercase)||( uppercase && number) ){
//                 text.innerText="Medium";
//                 text.style.color="Yellow"
//                 inside.style.width="60%"
//                 inside.style.color="Yellow"
    
//     }else
//     //  if(lowercase||uppercase||number||chac)
//      {
//         text.innerText="Weak";
//         text.style.color="red"
//         inside.style.width="30%"
//     }
        
//     }
    
//     })