import data from './data.json'

const petsArry = data

app.get('*', ()=>{

    res.send("Error, yo no se esto cosa").status(404)

})
app.get('/api/pets/:pet([A-Za-z%20]+)', (req, res) => {
    let pet = petsArry.find(e => e.code === req.params.pet)
    res.send({pet})
});
app.post('/api/pets/:pet', (req, res) => {

});
app.get(`/products`, (req, res) => {

});