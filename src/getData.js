async function getData(url){
    try {
        let response = await fetch(url);  

        if (!response.ok) {
         throw new Error(response.status);
        }
  
        response = await response.json();
  
        return response

    } catch (e) {
          console.log(e);
          return e;
        }
}

export default getData;