{% test is_unique(model, column_name) %}
    SELECT {{ column_name }}, COUNT(*)
    FROM {{ model }}
    GROUP BY {{ column_name }}
    HAVING COUNT(*) > 1
{% endtest %}