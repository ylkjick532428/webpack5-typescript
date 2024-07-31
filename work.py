import subprocess

# 获取每个人的提交次数
def get_commit_counts():
    result = subprocess.run(['git', 'shortlog', '-s', '-n'], stdout=subprocess.PIPE)
    commit_data = result.stdout.decode('utf-8').strip().split('\n')
    commit_counts = {}
    for line in commit_data:
        lineCount, author = line.strip().split('\t')
        commit_counts[author] = int(lineCount)
    return commit_counts

# 获取每个人添加和删除的代码行数
def get_code_stats(author):
    result = subprocess.run(['git', 'log', '--author', author, '--pretty=tformat:', '--numstat'], stdout=subprocess.PIPE)
    code_data = result.stdout.decode('utf-8').strip().split('\n')
    additions = 0
    deletions = 0
    for line in code_data:
        if line:
            lineAdd, lineDelete, _ = line.split('\t')
            # print(lineAdd, lineDelete)
            if lineAdd == '-':
                continue
            additions += int(lineAdd)
            deletions += int(lineDelete)
    return additions, deletions

# 计算每个人的代码贡献百分比
def calculate_contributions(commit_counts):
    total_additions = 0
    total_deletions = 0
    contributions = {}
    for author in commit_counts:
        additions, deletions = get_code_stats(author)
        total_additions += additions
        total_deletions += deletions
        contributions[author] = {'additions': additions, 'deletions': deletions}
    
    for author in contributions:
        additions = contributions[author]['additions']
        deletions = contributions[author]['deletions']
        total_code = total_additions + total_deletions
        contributions[author]['percentage'] = ((additions + deletions) / total_code) * 100

    return contributions

# 主函数
if __name__ == "__main__":
    commit_counts = get_commit_counts()
    contributions = calculate_contributions(commit_counts)

    jack = contributions['Jack Yang']
    tmpResult = {}
    for author, stats in contributions.items():
        if author in ['Jack', 'Jack.Yang', 'JackYang', 'ylkjick532428']:
            jack['additions'] += stats['additions']
            jack['deletions'] += stats['deletions']
            jack['percentage'] += stats['percentage']
            continue
    contributions['Jack Yang'] = jack
    if 'Jack' in contributions: del contributions['Jack']
    if 'Jack.Yang' in contributions: del contributions['Jack.Yang']
    if 'JackYang' in contributions: del contributions['JackYang']
    if 'ylkjick532428' in contributions: del contributions['ylkjick532428']
    
    # 按贡献百分比排序
    sorted_data = sorted(contributions.items(), key=lambda x: x[1]['percentage'], reverse=True)
    
    # 打印排序后的结果
    for author, stats in sorted_data:
        print(f"Author: {author}, Additions: {stats['additions']}, Deletions: {stats['deletions']}, Percentage: {stats['percentage']:.6f}%")

    
