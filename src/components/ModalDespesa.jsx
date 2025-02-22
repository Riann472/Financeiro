import axios from "axios"
import { useState } from "react"
import { FaX } from "react-icons/fa6"

const ModalDespesa = ({ setModal, setList }) => {
    const [data, setData] = useState({
        id: "",
        vencimento: "",
        descricao: "",
        fornecedor: "",
        status: "",
        valor: 0,
        gtin: "",
        detalhes: ""
    })

    function enviar(e) {
        e.preventDefault()
        axios.post(`http://localhost:3001/despesas`, data)
            .then(res => {
                setModal(false)
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    const valor = parseFloat(res.data.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    setList(prev => [...prev, { ...res.data, valor: valor, id: res.data.id }])
                }
            })
    }

    return (
        <div className="modal" >
            <div className="modalContainer">
                <h3>Adicionar Conta</h3>
                <FaX onClick={() => setModal(false)} />
                <form action="" onSubmit={e => enviar(e)}>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="vencimento">Vencimento: *</label>
                            <input type="date" id="vencimento" onChange={
                                e => setData({ ...data, vencimento: e.target.value })
                            } required />
                        </div>
                        <div className="input">
                            <label htmlFor="descricao">Descrição: *</label>
                            <input type="text" id="descricao" onChange={
                                e => setData({ ...data, descricao: e.target.value })
                            } placeholder="Insira a descrição" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="fornecedor">Fornecedor: </label>
                            <input type="text" id="fornecedor" onChange={
                                e => setData({ ...data, fornecedor: e.target.value })
                            } placeholder="Insira o fornecedor" />
                        </div>
                        <div className="input">
                            <label htmlFor="status">Status: *</label>
                            <select name="status" id="status" onChange={e => setData({ ...data, status: e.target.value })} required>
                                <option value="" disabled selected>Selecione um status</option>
                                <option value="Não pago">Não Pago</option>
                                <option value="Pago">Pago</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="valor">Valor: *</label>
                            <input type="number" id="valor" step="any" onChange={
                                (e) => setData({ ...data, valor: e.target.value })
                            } placeholder="Insira o valor" required />
                        </div>
                        <div className="input">
                            <label htmlFor="gtin">Código de barras ou PIX: </label>
                            <input type="text" id="valor" onChange={
                                (e) => setData({ ...data, gtin: e.target.value })
                            } placeholder="Insira o valor" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="detalhes">Detalhes: *</label>
                            <input type="text" id="detalhes" step="any" onChange={
                                (e) => setData({ ...data, detalhes: e.target.value })
                            } placeholder="Insira os detalhes da despesa" />
                        </div>
                    </div>
                    <button>Adicionar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalDespesa