<?php
// 计数文件的路径
$counterFile = 'counter.txt';

// 检查文件是否存在，如果不存在则创建并设置初始值为0
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, 0);
}

// 读取当前的计数
$currentCount = file_get_contents($counterFile);

// 增加计数
$newCount = intval($currentCount) + 1;

// 将新的计数写回文件
file_put_contents($counterFile, $newCount);

// 输出新的计数值，可以用于在网页上显示
echo $newCount;
?>