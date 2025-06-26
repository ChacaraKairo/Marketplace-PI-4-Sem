export const formatNumber = (digit: number) => {
    return new Intl.NumberFormat('pt-BR').format(digit)
}