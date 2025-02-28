import { useEffect, useState } from "react"
import axios from 'axios'
import { FaPlus } from "react-icons/fa"
import Table from "../components/Table"
import ModalDespesa from "../components/ModalDespesa"
import ModalEdit from "../components/ModalEdit"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [modalEdit, setModalEdit] = useState({
        status: false,
        despesa: {}
    })

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/')
        }
        axios.get(`${import.meta.env.VITE_DB}/despesas/`)
            .then(res => {
                if (res.data.length == 0) {
                    setList([])
                } else {
                    setList(res.data.map(e => {
                        const realVencimento = e.vencimento != null ? e.vencimento : "Não definido"
                        return { ...e, vencimento: realVencimento }
                    }))
                }
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="container center">
                {modal ? (<ModalDespesa setModal={setModal} list={list} setList={setList} />) : (null)}
                {modalEdit.status ? (<ModalEdit despesa={modalEdit.despesa} setModal={setModalEdit} list={list} setList={setList} />) : (null)}

                <div className="buttonSection">
                    <button className="button" onClick={() => setModal(true)}><FaPlus />Adicionar Conta</button>
                </div>
                <div className="listSection">
                    <Table list={list} setList={setList} setModalEdit={setModalEdit} />
                </div>
            </div>
        </>
    )
}

export default Home