import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const DespesaInfo = () => {
    const [despesa, setDespesa] = useState([])
    const params = useParams();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_DB}/despesas/${params.id}`)
            .then(res => {
                if (res.data == null) {
                    alert("Despesa nao cadastrada")
                } else {
                    setDespesa(res.data)
                }
            })
    }, [])

    function isCodeBar(code) {
        return code && code.length == 44 || code.length == 47 || code.length == 48
    }

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
                <div className="img">
                    {despesa.gtin && (
                        <>
                            {isCodeBar(despesa.gtin) ? (<img src={`https://api.invertexto.com/v1/barcode?token=17961%7Cb8aWFI5XhH0iI2yFhKElqCBaayLr616k&text=${despesa.gtin}&type=i25&font=arial`} alt="" />) : (<h3>Invalido</h3>)}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DespesaInfo