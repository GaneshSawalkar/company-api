const router = require("express").Router();

const Listing = require("../model/Listing");

// Add New contact
router.post("/create", async (req, res) => {
  const listing = new Listing(req.body);
    console.log(req.body)
    const savedListing = await listing.save();
    res.send(savedListing);
});     

// getOne contact
router.get("/:id", async(req, res) => {
 var abc = await Listing.findOne({
  _id:req.params.id
  })
  res.send(abc);
});

// Update contact
router.put("/:id", async(req, res) => {
  Listing.findByIdAndUpdate(req.params.id, req.body,
  function (err, docs) { 
if (err){ 
console.log(err) 
} 
else{ 
console.log("Updated User : ", docs); 
res.send(docs)
} 
}); 
});

// Delete listing
router.delete("/:id", (req, res) => {
  Listing.deleteOne({ _id: req.params.id },function(err, ress){
    if(err) {res.send(err)}else {res.send(ress)}

  })
 });
 router.post("/getAllPagination", async(req, res) => {
   var matchObj = {}
   //search by company name
   if(req.body.searchText){
     matchObj.companyName = req.body.searchText
   }
   //set page limit
   var page = req.body.page?req.body.page:1;
   var limit = req.body.limit?req.body.limit:5;
//display lists   
 var ListOfListing = await Listing.find(matchObj).skip((page - 1) * limit).limit(limit)
  res.send(ListOfListing)
 });

module.exports = router;
