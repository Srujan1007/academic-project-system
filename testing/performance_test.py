import requests
import time
import concurrent.futures
import matplotlib.pyplot as plt
import statistics
import os

# Configuration
URL = "http://localhost:5000/api/auth/login"
PAYLOAD = {"email": "student@test.com", "password": "wrongpassword"}  # Using incorrect password to benchmark bcrypt securely
CONCURRENCY_LEVELS = [5, 10, 20, 50, 100]
REQUESTS_PER_LEVEL = 100
ARTIFACT_DIR = r"c:\Users\srijan rajput\Documents\academic-project-system\testing\reports"

def make_request():
    start = time.time()
    try:
        requests.post(URL, json=PAYLOAD, timeout=10)
    except Exception:
        pass
    return (time.time() - start) * 1000  # ms

response_times_avg = []
response_times_95th = []
throughputs = []

print("Starting Performance Analysis for AcademiTrack API")
print("====================================================")

for concurrency in CONCURRENCY_LEVELS:
    print(f"Testing with Concurrency Level: {concurrency}...")
    times = []
    
    start_total = time.time()
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = [executor.submit(make_request) for _ in range(REQUESTS_PER_LEVEL)]
        for future in concurrent.futures.as_completed(futures):
            times.append(future.result())
            
    total_time = time.time() - start_total
    
    avg_req = statistics.mean(times)
    p95_req = sorted(times)[int(len(times)*0.95)]
    throughput = REQUESTS_PER_LEVEL / total_time
    
    response_times_avg.append(avg_req)
    response_times_95th.append(p95_req)
    throughputs.append(throughput)
    
    print(f"  -> Avg Response Time: {avg_req:.2f} ms")
    print(f"  -> 95th Percentile: {p95_req:.2f} ms")
    print(f"  -> Throughput: {throughput:.2f} req/sec\n")

# Apply dark theme styling to match the project aesthetics
plt.style.use('dark_background')
colors = ['#3b82f6', '#10b981', '#f59e0b']

# 1. Response Time Graph
plt.figure(figsize=(10, 6))
plt.plot(CONCURRENCY_LEVELS, response_times_avg, marker='o', linewidth=2, color=colors[0], label='Avg Response Time (ms)')
plt.plot(CONCURRENCY_LEVELS, response_times_95th, marker='s', linewidth=2, color=colors[2], label='95th Percentile (ms)', linestyle='--')
plt.title('API Response Time vs. Concurrency\n(Benchmarking Authentication Endpoint)', fontsize=14, fontweight='bold', color='white')
plt.xlabel('Number of Concurrent Users', fontsize=12, color='#94a3b8')
plt.ylabel('Response Time (ms)', fontsize=12, color='#94a3b8')
plt.grid(color='#334155', linestyle='-', linewidth=0.5, alpha=0.5)
plt.legend(facecolor='#1e293b', edgecolor='#334155')
plt.fill_between(CONCURRENCY_LEVELS, response_times_avg, alpha=0.1, color=colors[0])
plt.tight_layout()
plt.savefig(os.path.join(ARTIFACT_DIR, 'response_time_graph.png'), dpi=300, bbox_inches='tight')
plt.close()

# 2. Throughput Graph
plt.figure(figsize=(10, 6))
plt.plot(CONCURRENCY_LEVELS, throughputs, marker='^', linewidth=2, color=colors[1])
plt.title('System Throughput vs. Concurrency\n(Benchmarking API Bottleneck)', fontsize=14, fontweight='bold', color='white')
plt.xlabel('Number of Concurrent Users', fontsize=12, color='#94a3b8')
plt.ylabel('Throughput (Requests / Second)', fontsize=12, color='#94a3b8')
plt.grid(color='#334155', linestyle='-', linewidth=0.5, alpha=0.5)
plt.fill_between(CONCURRENCY_LEVELS, throughputs, alpha=0.15, color=colors[1])
plt.tight_layout()
plt.savefig(os.path.join(ARTIFACT_DIR, 'throughput_graph.png'), dpi=300, bbox_inches='tight')
plt.close()

print("Graphs successfully generated and saved to testing/reports directory.")
