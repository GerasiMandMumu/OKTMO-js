export class DataPrinter{
    static listToTable(data){
        let tableArr=['<table><tbody>'];
        tableArr.push('<tr><td>№</td><td>Код</td><td>Название</td><td>Уровень</td>');
        for(let i = 1; i < data.length; i++){
            tableArr.push('<tr><td>' + i + '</td><td>' + data[i - 1]['code'] + '</td><td>' 
            + data[i - 1]['name'] + '</td><td>' + data[i - 1]['level'] + '</td></tr>');
        }
        tableArr.push('</tbody></table>');
        document.querySelector(".box").innerHTML=tableArr.join('\n');
    }
}