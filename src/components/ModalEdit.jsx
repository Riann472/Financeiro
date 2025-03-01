import axios from "axios"
import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"

const ModalDespesa = ({ setModal, despesa, list, setList }) => {
    const [data, setData] = useState({
        id: despesa.id,
        vencimento: despesa.vencimento,
        descricao: despesa.descricao,
        fornecedor: despesa.fornecedor,
        status: despesa.status,
        valor: despesa.valor,
        gtin: despesa.gtin,
        detalhes: despesa.detalhes
    })

    function enviar(e) {
        e.preventDefault()

        axios.put(`${import.meta.env.VITE_DB}/despesas/${data.id}`, data, {
            headers: { accessToken: sessionStorage.getItem('token') }
        })
            .then(res => {

                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    setList(list.map(e => {
                        if (e.id != res.data.product.id) {
                            return e
                        } else {
                            return { ...res.data.product, valor: parseFloat(res.data.product.valor) }
                        }
                    }))
                    setModal({
                        status: false,
                        despesa: {}
                    })
                }
            })
    }

    return (
        <div className="modal" >
            <div className="modalContainer">
                <h3>Editar Conta</h3>
                <FaX onClick={() => setModal(false)} />
                <form action="" onSubmit={e => enviar(e)}>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="vencimento">Vencimento: *</label>
                            <input type="date" id="vencimento" onChange={
                                e => setData({ ...data, vencimento: e.target.value })
                            } required value={data.vencimento} />
                        </div>
                        <div className="input">
                            <label htmlFor="descricao">Descrição: *</label>
                            <input type="text" id="descricao" onChange={
                                e => setData({ ...data, descricao: e.target.value })
                            } placeholder="Insira a descrição" required value={data.descricao} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="fornecedor">Fornecedor: </label>
                            <input type="text" id="fornecedor" onChange={
                                e => setData({ ...data, fornecedor: e.target.value })
                            } placeholder="Insira o fornecedor" value={data.fornecedor} />
                        </div>
                        <div className="input">
                            <label htmlFor="status">Status: *</label>
                            <select
                                name="status"
                                id="status"
                                value={data.status}
                                onChange={e => setData({ ...data, status: e.target.value })}
                                required
                            >
                                <option value="" disabled>
                                    Selecione um status</option>
                                <option value="Não pago" >Não Pago</option>
                                <option value="Pago">Pago</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="valor">Valor: *</label>
                            <input type="number" id="valor" step="any" onChange={
                                (e) => setData({ ...data, valor: e.target.value })
                            } placeholder="Insira o valor" required value={data.valor} />
                        </div>
                        <div className="input">
                            <label htmlFor="gtin">Código de barras ou PIX: </label>
                            <input type="text" id="valor" onChange={
                                (e) => setData({ ...data, gtin: e.target.value })
                            } placeholder="Insira o valor" value={data.gtin} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <label htmlFor="detalhes">Detalhes: *</label>
                            <input type="text" id="detalhes" onChange={
                                (e) => setData({ ...data, detalhes: e.target.value })
                            } placeholder="Insira os detalhes da despesa" value={data.detalhes} />
                        </div>
                    </div>
                    <button>Editar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalDespesa