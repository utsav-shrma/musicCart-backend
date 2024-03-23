const priceRangeKeyMap={
    1:{min:0,max:1000},
    2:{min:1000,max:2000},
    3:{min:2000,max:5000},
    4:{min:6000,max:7000},
}

const sortKeyMap={
    1:{price:"asc"},
    2:{price:"desc"},
    3:{name:"asc"},
    4:{name:"desc"},
}

module.exports ={priceRangeKeyMap,sortKeyMap};