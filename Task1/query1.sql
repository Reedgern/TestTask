select t.purchase_month, sum(t.is_new) as t_count
from
(select client_id, purchase_month,
        (case lag(purchase_month, 1, 0) over (partition by client_id order by purchase_month) when 0 then 1 else 0 end) as is_new
from purchases) as t
group by t.purchase_month
order by t.purchase_month
