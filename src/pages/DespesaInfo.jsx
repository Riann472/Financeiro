import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const DespesaInfo = () => {
    const navigate = useNavigate()
    const params = useParams();

    const [despesa, setDespesa] = useState([])

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/')
        } else {
            axios.get(`${import.meta.env.VITE_DB}/despesas/${params.id}`)
                .then(res => {
                    if (res.data == null) {
                        alert("Despesa nao cadastrada")
                    } else {
                        setDespesa(res.data)
                    }
                })
        }
    }, [])

    if (despesa.length == 0) {
        return (
            <div className="infoContainer">
                <div className="info">
                    <h1>Carregando...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="infoContainer">
            <h1>Despesa: {despesa.descricao}</h1>
            <div className="info">
                <div className="row">
                    <div className="field">
                        <h3>Fornecedor </h3>
                        <p>{despesa.fornecedor}</p>
                    </div>

                    <div className="field">
                        <h3>Vencimento </h3>
                        <p>{despesa.vencimento.slice(8, 10)}/{despesa.vencimento.slice(5, 7)}/{despesa.vencimento.slice(0, 4)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="field">
                        <h3>Status </h3>
                        <p>{despesa.status}</p>
                    </div>
                    <div className="field">
                        <h3>Valor </h3>
                        <p>{despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
                {despesa.detalhes != '' && (<div className="row">
                    <div className="field large">
                        <h3>Detalhes </h3>
                        <p>{despesa.detalhes}</p>
                    </div>
                </div>)}
                {despesa.gtin ? (
                    <div className="img">
                        {despesa.gtin.length == 44 || despesa.gtin.length == 47 || despesa.gtin.length == 48 ? (
                            <img src={`https://api.invertexto.com/v1/barcode?token=${import.meta.env.VITE_API_BARCODE_TOKEN}&text=${despesa.gtin}&type=i25&font=arial`} alt="" />
                        ) : (<>{
                            despesa.gtin.startsWith('000201') && despesa.gtin.length >= 180 ? (<img className="pix" src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${despesa.gtin}`} />) : (<h3>Codigo de barras invalido</h3>)
                        }</>)}
                    </div>
                ) : (
                    <h3>Sem código de barras</h3>
                )}
            </div>
        </div>
    )
}

export default DespesaInfo