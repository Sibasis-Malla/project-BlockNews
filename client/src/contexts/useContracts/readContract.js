
  const getRooms = async (contract) => {
    if (!contract) {
        return false;
      }
    const res = await contract.methods.getArticles().call();
    return res;
  };
  const articlesData = async (contract) => {
    if (!contract) {
        return false;
      }
    const articles = await contract.methods.getArticles().call();
    return await Promise.all(articles.map(async(_id) => {
      const { id, content_URI, time_created, totalParticipants, status } =
        await contract.methods.DisplayArticleList(_id).call();

        return {
            id, content_URI, time_created, totalParticipants, status
        }
    }));
    
  }

  const getRoomParticipants = async (contract, id) => {
    if (!contract) {
        return [];
      }
    const res = await contract.methods.getParticipants(id).call();
    return res;
  };

  const getStatus = async (contract, id) => {
    if (!contract) {
        return false;
      }
    const res = await contract.methods.getCurrentStatus(id).call();
    return res;
  };

  const getParticipantsStake = async (contract, id, address) => {
    if (!contract) {
        return false;
      }
    const res = await contract.methods.getParticipantsStake(id, address).call();
    return res;
  };

  const getParticipantsVote = async (contract, id, address) => {
    if (!contract) {
        return false;
      }
    const res = await contract.methods.getParticipantsVote(id, address).call();
    return res;
  };

  const getVerdict = async (contract, id) => {
    if (!contract) {
        return false;
      }
    const res = await contract.methods.getVerdict(id).call();
    return res;
  };
  const getTime = async(contract,id)=> {
    if (!contract) {
        return false;
      }
    const res = await contract.methods.getTime(id).call();
    return res;
  };



export {
    getRooms,
    getParticipantsVote,
    getVerdict,
    getStatus,
    getRoomParticipants,
    getParticipantsStake,
    articlesData,
    getTime
  };
