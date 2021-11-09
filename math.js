const calctotalTip = (total,tipPrecent = 0.2) =>{
    const tip = total * tipPrecent
    return total + tip ;
}

module.exports = calctotalTip