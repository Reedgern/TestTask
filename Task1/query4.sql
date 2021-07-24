select t1.purchase_month, count(t2.client_id)
from (select distinct purchase_month
from purchases) as t1
left join (select client_id, purchase_month,
       (lead(purchase_month, 1, 0) over (partition by client_id order by purchase_month)) as next
from purchases) as t2
on t1.purchase_month = (t2.purchase_month + 1) and (t2.next != t1.purchase_month) and (t2.purchase_month != t2.next)
group by t1.purchase_month
order by t1.purchase_month
