

const getnotes = () => {
    return fetch("/api/save", {
        method: "GET",
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
}