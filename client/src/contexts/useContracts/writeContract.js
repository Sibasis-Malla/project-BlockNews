
    const intializeArticle = async(contract,account,id,data)=>{
        await contract.methods.initializeArticle(id,data).send({from:account})
    }
    const participate = async(contract,account,id)=>{
        await contract.methods.participate(id).send({from:account});
    
    }
    const voteFor = async(contract,account,id,stake)=>{
        await contract.methods.voteFor(id,stake).send({from:account,value:stake});
    }
    
    const voteAgainst = async(contract,account,id,stake)=>{
        await contract.methods.voteAgainst(id,stake).send({from:account,value:stake});
    }
 


export {participate,voteFor,voteAgainst,intializeArticle}
