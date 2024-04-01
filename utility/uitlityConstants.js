const priceRangeKeyMap={
    1:{min:0,max:1000},
    2:{min:1000,max:10000},
    3:{min:10000,max:20000},
}

const sortKeyMap={
    1:{price:"asc"},
    2:{price:"desc"},
    3:{name:"asc"},
    4:{name:"desc"},
}

module.exports ={priceRangeKeyMap,sortKeyMap};