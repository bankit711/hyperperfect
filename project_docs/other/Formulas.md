const template = `=LET(  
secondMonthCellReference, ${nextColAfterFirst}$1,  
lastMonthCellReference, ${nextColAfterFirst}$1,  
firstMonthInRowCellReference, ${firstCol}rowPlaceholder,  
secontMonthInRowCellReference,${nextColAfterFirst}rowPlaceholder,  
penultimateMonthinRowCellReference, ${prevColBeforeLast}rowPlaceholder,  
lastMonthinRowCellReference, ${lastCol}rowPlaceholder,  
IFERROR(MAX(FILTER(secondMonthCellReference:${nextColAfterFirst}$1, (${firstCol}rowPlaceholder: ${prevColBeforeLast}rowPlaceholder<>0)*(${nextColAfterFirst}rowPlaceholder:${lastCol}rowPlaceholder=0))),""))';



const template = `=IFERROR(MAX(FILTER(${nextColAfterFirst}$1:${lastCol}$1, (${firstCol}rowPlaceholder:${prevColBeforeLast}rowPlaceholder<>0)*(${nextColAfterFirst}rowPlaceholder:${lastCol}rowPlaceholder=0))),"")`;


const template = '=IFERROR(IF(XLOOKUP(TRUE, $G2:$R2<>0, G$1:$R$1, "", 0, -1)=MAX($G$1:$R$1),"",EDATE(XLOOKUP(TRUE, $G2:$R2<>0, $G$1:$R$1, "", 0, -1),1)),"")