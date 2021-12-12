const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransactions = ID => {
  transactions = transactions.filter(transactions => transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDOM = ({ amount, name, id }) => {
  const operator = amount < 0 ? '-' : '+'
  const CSSClass = amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass)
  li.innerHTML = `${name} <span> ${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn" onClick="removeTransaction(${id})">x</button>`
transactionsUl.append(li)
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0))
  .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
  .filter(value => value > 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
  .reduce((accumulator, transaction) => accumulator + transaction, 0)
  .toFixed(2)

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount)
  const total = getTotal(transactionsAmounts)
  const income = getIncome(transactionsAmounts)
  const expense = getExpenses(transactionsAmounts)

  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
  transactionsUl.innerHTML = ' '
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })
}

const cleanInputs = () => {
  inputTransactionName.value = ' '
  inputTransactionAmount.value = ' '
}

const handleFormSubmit = event => {
  event.preventDefault()
  const init = () => {
    transactionsUl.innerHTML = ' '
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
  }

  const updateLocalStorage = () => localStorage.setItem('trasnactions', JSON.stringify(transactions))
  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  const isSomeInputEmpty = transactionName === ' ' || transactionAmount === ' '

  if (isSomeInputEmpty) {
    alert('Por favor, preencha os campos nome e valor da transação')
    return
  }

  addToTransactionsArray(transactionName, transactionAmount)
  init()
  updateLocalStorage()
  cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)
