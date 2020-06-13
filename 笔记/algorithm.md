#### 题目  
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。
``` 
示例 1：
 输入： 2
 输出： 2
 解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

示例 2：
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

```

> 来源：力扣（LeetCode）链接：https://leetcode-cn.com/problems/climbing-stairs


#### 题解:
##### (-) 递归解法
   ##### 方法1  ---递归
    
  >推导公式 fn=fn-1+fn-2


   ![递推公式](/images/爬楼梯/2.png)

  - 复杂度分析:
   ![递推公式](/images/爬楼梯/6.png)

```java
    public class Solution{
        public int climbStairs(int n){
            if(n===1){
                return 1;
            }
            if(n===2){
                return 2;
            }
            return climbStairs(n-1)+climbStairs(n-2)
        }
    }
```
  缺点:进行了很多重复的计算,比如爬到第三级台阶,和爬到第4节台阶的时候,都计算了第二级台阶的方法,为了减少时间复杂度,我们可以用记忆递归




##### (二) 记忆递归法
 - 复杂度分析:
   - 时间复杂度: O(n)
   - 空间复杂度: O(n)
  
```java
    public class Solution{
        //用memo 数组记录每次递归的结果,存储中间结果,避免重复计算,当计算到n级台阶时,如果第n级的方法已经计算过了,则直接返回memo 中保存的结果,这样就避免了重复的计算
        public int climbStairs(int n){
           int merno[]=new int[n+1];
           return climbStairsMemo(n,memo)
        }
        public int climbStairsMemo(int n,int memo[]){
            if(memo[n]>0){
                return memo[n]
            }
            if(n===1){
                memo[n]=1
            }else if(n===2){
                memo[n]=2
            }else{
                memo[n]=clibStairsMemo(n-1,memo)+climbStairsMemo(n-2,memo);
            }
            return memo[n]
        }
    }
```

##### (三) 动态规划法
 - 复杂度分析:
   - 时间复杂度: O(n)
   - 空间复杂度: O(n)
  
```java
    public class Solution{
        public int climbStairs(int n,int memo[]){
            //爬到每一个台阶的方法看作一个状态;使用dp 这个数组来记录状态;记录 n 个状态,从1 到n 依次更新
            if(n===1){
               return 1
            }
            int[] dp=new int[n+1];
            dp[1]=1
            dp[2]=2
            for(int i=3;i<=n;i++>){
                dp[i]=dp[i-1]+dp[i-2]; 
            }
            return dp[n]
        }
    }
```
分析: 该方法的实现中,记录了全部 <font color="#f00">n</font> 的状态 但其实只有两个状态只有在更新下一个状态中会用到,如果只记录这两个状态控件复杂度可从 <span style="padding:5px 10px;background:#eee;color:#d14">O(n)</span> 降为 <span style="padding:5px 10px;background:#eee;color:#d14">O(1)</span> 故 方法4

##### (四) 斐波那契数列 -->滚动数组
 - 复杂度分析:
   - 时间复杂度: O(n)
   - 空间复杂度:O(1)
  
```java
    public class Solution{
        public int climbStairs(int n,int memo[]){
            //使用滚动数组的方法记录n-1 和n-2 两个状态 ;每次状态更新之后先把状态2移动到状态1;再把状态3移动到状态2的位置;也就是说把状态整体向前滚动一位
            if(n===1){
               return 1
            }
            int first=1;
            int second=2;
            for(int i=3;i<=n;i++){
                int third=first+second;
                first=second
                second=third
            }
            return second
        }
    }
```

还有 斐波那契数列 通项公式法 太难了 不记录了记录了也看不懂