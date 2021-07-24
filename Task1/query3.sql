select t.purchase_month, sum(t.returned)
from (select client_id, purchase_month,
       (case when purchase_month - lag(purchase_month::int, 1, purchase_month::int) over (partition by client_id order by purchase_month) > 1 then 1 else 0 end) as returned
from purchases) as t
group by t.purchase_month
order by t.purchase_month