import json

with open('scripts/build_n5_2012_explanations.py', 'r', encoding='utf-8') as f:
    code = f.read()

# get explanations from the module
scope = {}
exec(code, scope)
explanations = scope['explanations']

with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if n5-2012-12 already in content
if '"n5-2012-12":' in content:
    print('n5-2012-12 already in jlptDetailedExplanations.ts')
else:
    # Format json as TypeScript object
    json_str = json.dumps(explanations, ensure_ascii=False, indent=4)
    # Convert keys to numbers if needed or string keys
    injection = f'\n  "n5-2012-12": {json_str},\n  "n5-2012": {json_str},\n  "n5-12-2012": {json_str},\n'

    # Insert right after 'export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {'
    target = 'export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {'
    idx = content.find(target)
    if idx != -1:
        new_content = content[:idx + len(target)] + injection + content[idx + len(target):]
        with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Successfully injected n5-2012-12 into jlptDetailedExplanations.ts!')
    else:
        print('Target not found!')
