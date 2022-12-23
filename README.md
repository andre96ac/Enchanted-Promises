# Enchanted Promises
<br>

- [Enchanted Promises](#enchanted-promises)
  - [Description:](#description)
  - [Usage:](#usage)
    - [- AllSettled](#--allsettled)
    - [- sequantiallyExecution](#--sequantiallyexecution)

<br>
<br>

## Description:

Enchanted Promises is a package, constantly updated, which makes the modern features of the promises available, even with the oldest javascript (before es6)

<br>
<br>


## Usage:


### - AllSettled

```typescript
    import * as EnchantedPromises from 'enchanted-promises'


    //EXAMPLE PROMISE GENERATOR FUNCTION
    function waitPromise(time: number, isError:boolean): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if(isError){
                    reject('not ok');
                }
                else{
                    resolve('ok');
                }
            }, time);
        })
    }


    const promise1: Promise<string> = waitPromise(5000, false)
    const promise2: Promise<string> = waitPromise(300, true)


    //EXAMPLE OF USAGE
    EnchantedPromises.allSettled([promise1, promise2])
    .then(result => {
        console.log(result) // [{result: 'ok'},{error: 'not ok'}]
    })
    .catch(err => {
        //never happens
    })
```




### - sequantiallyExecution


```typescript
 // Simple async function
 function delayAndWrite(seconds: number, text: string){
    return new Promise<void>((resolve, _) => {
        setTimeout(() => {console.log(text); resolve()}, seconds * 1000);
    })
}


const arPromises = [delayAndWrite, delayAndWrite, delayAndWrite];
const arParams = [[7, 'pippo'], [1, 'mario'], [1, 'gervasio']];



sequentiallyExecution(arPromises, arParams, false)
                                           .then(() => console.log('All done!'))
                                           .catch((err) => {console.log('ERROR! ', err)});

```
