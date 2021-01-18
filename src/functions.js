export const convertDate = (data) => (
    data.split('T')[0].split('-').reverse().join('/')
);

const convertNumber = (number) => (
    number < 10 ? ("0" + number.toString()) : (number.toString())
)

export const convertDateText = (date) => {
    let meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let newDate = date.split('T')[0].split('-');
    let newTime = date.split('T')[1].split(':');

    let day = newDate[2];
    let hour = newTime[0] - 3;

    if(hour < 0){
        hour += 24;
        day -= 1;
    }

    let ans = `
    Publicado em ${day} 
    de ${meses[parseInt(newDate[1])]} 
    de ${newDate[0]} 
    às ${convertNumber(parseInt(hour))}h${newTime[1]}
    `

    return ans;
}