import numpy as np

def calculate_market_equilibrium(P0, Q0, P1, Ed, Es, extra_demand):
    """
    计算市场均衡的成交量和额外成交量

    参数：
    P0 - 原均衡价格
    Q0 - 原均衡成交量
    P1 - 新的买方出价
    Ed - 需求价格弹性（通常为负）
    Es - 供给价格弹性（通常为正）
    extra_demand - 额外买方需求量（如果有）

    返回：
    Q1 - 新的均衡成交量
    delta_Q - 额外成交量
    """
    
    # 计算新价格下的需求量和供给量
    Qd = Q0 * (P1 / P0) ** Ed  # 需求量（通常减少）
    Qs = Q0 * (P1 / P0) ** Es  # 供给量（通常增加）
    
    # 计算新的均衡成交量
    Q1 = Qd + extra_demand  # 买方填补需求缺口
    Q1 = min(Q1, Qs)  # 受供给量限制，不能超过可供给的最大值
    
    # 计算额外成交量
    delta_Q = Q1 - Q0
    
    return Q1, delta_Q

# 示例输入
P0 = 0.99  # 原均衡价格
Q0 = 1855      # 原均衡成交量
P1 = 2   # 买方新出价
Ed = -0.1   # 需求价格弹性（通常负值）
Es = 0.1   # 供给价格弹性（通常正值）
extra_demand = 1000  # 买方额外需求量

# 计算市场均衡
Q1, delta_Q = calculate_market_equilibrium(P0, Q0, P1, Ed, Es, extra_demand)

# 输出结果
print(f"新均衡成交量: {Q1:.2f} 件")
print(f"额外成交量: {delta_Q:.2f} 件")
