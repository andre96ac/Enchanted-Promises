export type AllSettledResult<T> = {result?: T, error?: any} 

export function allSettled<T>(arPromises: Promise<T>[]):Promise<AllSettledResult<T>[]>{

    return new Promise<AllSettledResult<T>[]>((resolve, _) => {
        const arResults: AllSettledResult<T>[] = [];
    
        arPromises.forEach((elPromise, idx) => {
            elPromise
            .then(result => {
                arResults[idx] = {result}
                if(countArray(arResults) >= arPromises.length){
                    resolve(arResults)
                }
                
            })
            .catch(error => {
                arResults[idx] = {error}
                if(countArray(arResults) >= arPromises.length){
                    resolve(arResults)
                }
            })

        })
        
    })
}

function countArray(arToCount: Array<any>): number{
    let idx = 0;
    arToCount.forEach(el => {idx ++})
    return idx;
}






//#region TEST

// function waitPromise(time: number, isError:boolean): Promise<void>{
//     return new Promise<void>((resolve, reject) => {
//         setTimeout(() => {
//             if(isError){
//                 reject();
//             }
//             else{
//                 resolve();
//             }
//         }, time);
//     })
// }




// allSettled([waitPromise(5000, false), waitPromise(500, true)])
// .then(result => {console.log(result)})

//#endregion TEST