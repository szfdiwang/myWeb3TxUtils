const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

    const rpc = 'http://8.219.154.203:7789'
    // @ts-ignore
    const web3 = new Web3(rpc);
    const privateKey = Buffer.from(
        '96f1f76c45bc2dd9c0f84a11da4ec104ae95661871284a29413a454a70b15307',
        'hex',
    )
    // const privateKey = `96f1f76c45bc2dd9c0f84a11da4ec104ae95661871284a29413a454a70b15307`
    console.log('privateKey', privateKey);
    const wallet = web3.eth.accounts.privateKeyToAccount(`0x96f1f76c45bc2dd9c0f84a11da4ec104ae95661871284a29413a454a70b15307`);
    console.log('wallet', wallet);
    const accountFrom = wallet.address;
    console.log('accountFrom', accountFrom);
    

    console.log('21000', web3.utils.toHex('21000'));
    //导入ethereumjs-tx库，通过npm install安装
    
    //_from为发起交易的地址
    //nonce随机数，这里取该账号的交易数量
    web3.eth.getTransactionCount(accountFrom).then(async(nonce)=>{
        console.log('nonce', nonce);
        var rawTx = {
            nonce: '0x' + nonce,//随机数
            //gasPrice和gasLimit如果不知道怎么填，可以参考etherscan上的任意一笔交易的值
            gasPrice: '0x77359400',
            gasLimit: '0x5208',
            to: '0x27B80eDBebB98b697907c204D4ec795aF50EFACb',//接受方地址或者合约地址
            value: '0x100',//发送的金额，这里是16进制，实际表示发送256个wei
            data: ''
        }

        console.log('rawTx', rawTx);
        const signedTx = await web3.eth.accounts.signTransaction(rawTx, wallet.privateKey)
        console.log('tx', signedTx);
        // const serializedTx = signedTx.serialize()
        // console.log('serializedTx', serializedTx);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)   
        console.log('receipt', receipt);
        // wallet.signTransaction(rawTx,accountFrom).then((res)=>{
        //     console.log('res', res);
        //     const serializedTx = res.rawTransaction;
        //     console.log('serializedTx', serializedTx);
        //     web3.eth.sendSignedTransaction(serializedTx).on('receipt', console.log);
        // });
        // console.log('receipt', receipt);
        // const sendRes =  await web3.eth.sendSignedTransaction(receipt)
        // console.log('sendRes', sendRes);
    })
    
    //使用私钥对原始的交易信息进行签名，得到签名后的交易数据
  
    // web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    //     if (!err) {
    //         console.log(hash);
    //     } else {
    //         console.log(err);
    //     }
    // });




