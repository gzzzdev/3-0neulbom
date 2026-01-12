/**
 * logics 패키지 사용 예시
 * 
 * 두 가지 방법으로 import 가능:
 * 1. alias 사용: @logics
 * 2. package 이름 사용: @monorepo/logics
 */

// 방법 1: alias 사용 (권장)
import { greet, add, multiply } from '@logics'

// 방법 2: package 이름 사용
// import { greet, add, multiply } from '@monorepo/logics'

export function useLogicsExample() {
  const greeting = greet('World')
  const sum = add(5, 3)
  const product = multiply(4, 7)
  
  console.log(greeting) // "Hello, World!"
  console.log(sum) // 8
  console.log(product) // 28
  
  return { greeting, sum, product }
}


