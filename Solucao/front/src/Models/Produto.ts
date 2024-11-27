export interface Produto{
    ///SEMPRE INICIAR O OBJETO COM LETRA MINUSCULA, SE NÃO O HTML DO REACT NÃO FUNFA
    id: number;
    nome:string;
    descricao:string;
    valor:number;
    status:string;
}