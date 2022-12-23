

/**
 * 
 * @param arPromises array of methods which returns a promise
 * @param arParams array of array of params
 * @param breakOnError set if execution must stop or continue after an error occours
 * @returns promise wich resolves when all others are executed
 */
export function sequentiallyExecution(arPromises: ((...params: any) => Promise<any>)[], arParams: any[][], breakOnError: boolean = false): Promise<void>{



    if(!!arPromises && arPromises.length > 0){


        const promiseToResolve: (...params: any) => Promise<any> = arPromises.shift() || Promise.resolve;
        const paramsForExecution: any[] = arParams.shift() || [];
            return promiseToResolve(...paramsForExecution).then(data => {
               return sequentiallyExecution(arPromises, arParams, breakOnError);
            })
            .catch(error => {
                console.error(error);
                return breakOnError? Promise.reject(error) : sequentiallyExecution(arPromises, arParams, breakOnError);
            })
    }
    else {
        return Promise.resolve();
    }




}





//TEST

// function delayAndWrite(seconds: number, text: string){
//     return new Promise<void>((resolve, _) => {
//         setTimeout(() => {console.log(text); resolve()}, seconds * 1000);
//     })
// }
// const arPromises = [delayAndWrite, delayAndWrite, delayAndWrite];


// sequentiallyExecution(arPromises, [[7, 'pippo'], [1, 'mario'], [1, 'gervasio']])
//                                                                                     .then(() => console.log('finito tutto!'))
//                                                                                     .catch((err) => {console.log('sono in errore', err)});




