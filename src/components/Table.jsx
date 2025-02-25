import axios from "axios";
import { FaRegTrashCan, FaPencil, FaInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Table = ({ list, setList, setModalEdit }) => {
    function remove(id) {
        const question = confirm("Deletar despesa?")
        if (question) {
            axios.delete(`${import.meta.env.VITE_DB}/despesas/${id}`)
                .then(res => {
                    setList(list.filter(e => e.id != id))
                })
        }
    }

    function edit(e) {
        const valor = typeof (e.valor) == "number" ? e.valor : parseFloat(e.valor.slice(3, 7))
        setModalEdit({
            status: true,
            despesa: { ...e, valor: valor }
        })
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Vencimento</th>
                    <th>Descrição</th>
                    <th>Fornecedor</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {list.map((e, index) => {
                    let data_vencimento = `${e.vencimento.slice(8, 10)}/${e.vencimento.slice(5, 7)}/${e.vencimento.slice(0, 4)}`;
                    return (
                        <tr key={index}>
                            <td data-label="Vencimento">{e.vencimento != "Não definido" ? data_vencimento : e.vencimento}</td>
                            <td data-label="Descrição">{e.descricao}</td>
                            <td data-label="Fornecedor">{e.fornecedor ? e.fornecedor : "Não definido"}</td>
                            <td data-label="Valor">{e.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td data-label="Status">{e.status}</td>
                            <td data-label="Ações" className="flex">
                                <div className="flex icon" onClick={_ => remove(e.id)}><FaRegTrashCan /><p>Deletar</p></div>
                                <div className="flex icon" onClick={_ => edit({ ...e, vencimento: e.vencimento.slice(0, 10) })}><FaPencil /><p>Editar</p></div>
                                <Link to={`/info/${e.id}`} className="flex icon"><FaInfo /><p>Mais...</p></Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>)
}

export default Table