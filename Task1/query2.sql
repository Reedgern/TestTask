select t.purchase_month, sum(t.twice)
from (select client_id, purchase_month,
       (case purchase_month - lag(purchase_month, 1, purchase_month) over (partition by client_id order by purchase_month) when 1 then 1 else 0 end) as twice
from purchases) as t
group by t.purchase_month
order by t.purchase_month
