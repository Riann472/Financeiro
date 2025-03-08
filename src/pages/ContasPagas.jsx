import { useEffect, useState } from "react"
import Table from "../components/Table"
import axios from "axios"
import ModalEdit from "../components/ModalEdit"

const ContasPagas = () => {
    const [list, setList] = useState([])
    const [fullList, setFullList] = useState([])
    const [fornecedor, setFornecedor] = useState('')
    const [modalEdit, setModalEdit] = useState({
        status: false,
        despesa: {}
    })

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/')
        }

        axios.get(`${import.meta.env.VITE_DB}/despesas/paid`)
            .then(res => {
                if (res.data.length == 0) {
                    setFullList([])
                } else {
                    setFullList(res.data.map(e => {
                        const realVencimento = e.vencimento != null ? e.vencimento : "Não definido"
                        return { ...e, vencimento: realVencimento }
                    }))
                    setList(res.data.map(e => {
                        const realVencimento = e.vencimento != null ? e.vencimento : "Não definido"
                        return { ...e, vencimento: realVencimento }
                    }))
                }
            }).catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        setList(fullList.filter(e => {
            return e.fornecedor.toLowerCase().startsWith(fornecedor.toLowerCase())
        }))
    }, [fornecedor])

    return (

        <div className="container center">
            <h1>CONTAS PAGAS</h1>
            {modalEdit.status ? (<ModalEdit despesa={modalEdit.despesa} setModal={setModalEdit} list={list} setList={setFullList} />) : (null)}
            <div className="buttonSection">
                <input type="text" placeholder="Fornecedor" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
            </div>
            <div className="listSection">
                <Table list={list} setList={setFullList} setModalEdit={setModalEdit} />
            </div>
        </div>
    )
}

export default ContasPagas