package main

import(
	"fmt"
	"encoding/json"
	"bytes"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

type DataChaincode struct {

}

type Data struct {
	Username string `json:"username"`
	num int `json:"num"`
}

func (t *DataChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (t *DataChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {

	fn , args := stub.GetFunctionAndParameters()

	if fn == "publishData" {
		return t.publishData(stub,args)
	} else if fn == "getData" {
		return t.getData(stub,args)
	}

	return shim.Error("Invoke 调用方法有误！")
}

func (t *DataChaincode) publishData(stub shim.ChaincodeStubInterface , args []string) peer.Response{
	// 查询当前用户的票数，如果用户不存在则新添一条数据，如果存在则给票数加1
	fmt.Println("start publish")
	data := Data{}
	username := args[0]
	dataAsBytes, err := stub.GetState(username)

	if err != nil {
		shim.Error("dataUser 获取用户信息失败！")
	}

	if dataAsBytes != nil {
		err = json.Unmarshal(dataAsBytes, &data)
		if err != nil {
			shim.Error(err.Error())
		}
		data.num += 1
	}else {
		data = Data{ Username: args[0], num: 1} 
	}

	//将 Data 对象 转为 JSON 对象
	dataJsonAsBytes, err := json.Marshal(data)
	if err != nil {
		shim.Error(err.Error())
	}

	err = stub.PutState(username,dataJsonAsBytes)
	if err != nil {
		shim.Error("dataUser write ledger failed！")
	}

	fmt.Println("end dataUser")
	return shim.Success(nil)
}

func (t *DataChaincode) getData(stub shim.ChaincodeStubInterface, args []string) peer.Response{

	fmt.Println("start getData")
	// 获取所有用户的票数
	resultIterator, err := stub.GetStateByRange("","")
	if err != nil {
		return shim.Error("getData failed！")
	}
	defer resultIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	isWritten := false

	for resultIterator.HasNext() {
		queryResult , err := resultIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		if isWritten == true {
			buffer.WriteString(",")
		}

		buffer.WriteString(string(queryResult.Value))
		isWritten = true
	}

	buffer.WriteString("]")

	fmt.Printf("query result：\n%s\n",buffer.String())
	fmt.Println("end getData")
	return shim.Success(buffer.Bytes())
}

func main(){
	err := shim.Start(new(DataChaincode))
	if err != nil {
		fmt.Println("vote chaincode start err")
	}
}