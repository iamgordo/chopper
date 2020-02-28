

let people = ['John', 'Brian', 'Joseph', 'Dean', 'Paul'];

people.forEach(person =>{
    console.log(person);
})




// ------or----------------

function showname(index, person){
    console.log(index, person)
}

people.forEach(showname);//see above array